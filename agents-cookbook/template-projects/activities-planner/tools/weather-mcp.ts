import { mcpTool } from '@agent-fabric/agents-sdk';

export const weatherMcpTool = mcpTool({
  id: 'weather-mcp',
  name: 'Weather',
  serverUrl: 'https://mcp.cloud.localhost/weather/mcp',
  imageUrl:
    'https://cdn.iconscout.com/icon/free/png-256/free-ios-weather-icon-svg-download-png-461610.png?f=webp',
});
