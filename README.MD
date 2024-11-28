
### Prerequisites
```bask
sudo apt-get install nodejs npm grpcurl
```

## Installation

```bash
npm install -g everhdezz/starlink-monitor-cli
```

## Configuration
1. Update the api url.
```bash
starlink-monitor config:api-url {apiUrl}
```
2. Cronjob settings
```bash
echo "* * * * * root starlink-monitor devices:ping" | sudo tee /etc/cron.d/starlink_monitor
sudo chmod 644 /etc/cron.d/starlink_monitor
```

## Usage

### List all devices
```bash
starlink-monitor devices:list
```

### Add a new device
Add a new device by providing the device token.
```bash
starlink-monitor devices:add {deviceToken}
```

Optionally, you can add the host and port.
```bash
starlink-monitor devices:add {deviceToken} --host {host} --port {port}
```

the gRPC protocol call can be ignored with the parameter --ignoreGrpc
```bash
starlink-monitor devices:add {deviceToken} --ignoreGrpc
```

### Remove a device
Remove a device by index (obtained from the devices:list command).
```bash
starlink-monitor devices:add {deviceIndex}
```

### Ping all devices
Send a ping from all devices to the API.
```bash
starlink-monitor devices:ping
```
