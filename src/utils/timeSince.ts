function timeSince(timestamp: number): string {
  const now = new Date();
  const createdAt = new Date(timestamp);
  const seconds = Math.floor((now.getTime() - createdAt.getTime()) / 1000);
  const intervals = {
    year: 31536000, // 60 * 60 * 24 * 365
    month: 2592000, // 60 * 60 * 24 * 30
    day: 86400, // 60 * 60 * 24
    hour: 3600, // 60 * 60
    minute: 60, // 60
    second: 1, // 1
  };

  switch (true) {
    case seconds >= intervals.year: {
      const years = Math.floor(seconds / intervals.year);
      return `${years}y`;
    }
    case seconds >= intervals.month: {
      const months = Math.floor(seconds / intervals.month);
      return `${months}M`;
    }
    case seconds >= intervals.day: {
      const days = Math.floor(seconds / intervals.day);
      return `${days}d`;
    }
    case seconds >= intervals.hour: {
      const hours = Math.floor(seconds / intervals.hour);
      return `${hours}h`;
    }
    case seconds >= intervals.minute: {
      const minutes = Math.floor(seconds / intervals.minute);
      return `${minutes}m`;
    }
    default:
      return `${seconds}s`;
  }
}

export default timeSince;
