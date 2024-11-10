
### Prerequisites
```bask
sudo apt-get install nodejs npm grpcurl
```

## Installation

```bash
npm install -g everhdezz/starlink-monitor-cli
```

## Configuration
You need update the api url.
```bash
starlink-monitor config:api-url {apiUrl}
```

## Usage

### List all devices
```bash
starlink-monitor devices:list
```

### Add a new device
```bash
starlink-monitor devices:add {deviceToken}
```

Optionally, you can add the host and port.
```bash
starlink-monitor devices:add {deviceToken} --host {host} --port {port}
```

### Remove a device
```bash
starlink-monitor devices:add {deviceIndex}
```