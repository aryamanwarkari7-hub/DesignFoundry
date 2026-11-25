using System.Collections.Concurrent;

namespace Designsfactory.Services;

/// <summary>
/// Lightweight, zero-dependency daily file logger for IIS and production deployments.
/// Writes logs to Logs/designfoundry-yyyy-MM-dd.log.
/// </summary>
public sealed class FileLoggerProvider : ILoggerProvider
{
    private readonly string _logDirectory;
    private readonly LogLevel _minLevel;
    private readonly ConcurrentDictionary<string, FileLogger> _loggers = new();
    private static readonly object FileLock = new();

    public FileLoggerProvider(string logDirectory, LogLevel minLevel = LogLevel.Information)
    {
        _logDirectory = logDirectory;
        _minLevel = minLevel;
        Directory.CreateDirectory(_logDirectory);
    }

    public ILogger CreateLogger(string categoryName) =>
        _loggers.GetOrAdd(categoryName, name => new FileLogger(name, _logDirectory, _minLevel, FileLock));

    public void Dispose() => _loggers.Clear();

    private sealed class FileLogger : ILogger
    {
        private readonly string _category;
        private readonly string _logDirectory;
        private readonly LogLevel _minLevel;
        private readonly object _lock;

        public FileLogger(string category, string logDirectory, LogLevel minLevel, object fileLock)
        {
            _category = category;
            _logDirectory = logDirectory;
            _minLevel = minLevel;
            _lock = fileLock;
        }

        public IDisposable? BeginScope<TState>(TState state) where TState : notnull => null;

        public bool IsEnabled(LogLevel logLevel) => logLevel >= _minLevel && logLevel != LogLevel.None;

        public void Log<TState>(
            LogLevel logLevel,
            EventId eventId,
            TState state,
            Exception? exception,
            Func<TState, Exception?, string> formatter)
        {
            if (!IsEnabled(logLevel)) return;

            var message = formatter(state, exception);
            if (string.IsNullOrWhiteSpace(message) && exception == null) return;

            var line = $"[{DateTime.Now:yyyy-MM-dd HH:mm:ss}] [{logLevel}] [{_category}] {message}";
            if (exception != null)
            {
                line += Environment.NewLine + exception;
            }

            var filePath = Path.Combine(_logDirectory, $"designfoundry-{DateTime.Now:yyyy-MM-dd}.log");
            lock (_lock)
            {
                File.AppendAllText(filePath, line + Environment.NewLine);
            }
        }
    }
}
