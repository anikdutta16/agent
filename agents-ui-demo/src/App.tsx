import './App.css';
import { AgentFabricEmbeddedChat } from './chat-ui';

function App() {
  return (
    <div className="agent-fabric-chat-container">
      <AgentFabricEmbeddedChat
        baseSettings={{
          primaryBrandColor: '#3784ff',
        }}
        aiChatSettings={{
          baseUrl: 'http://localhost:3002',
          appId: 'YOUR_APP_ID',
        }}
      />
    </div>
  );
}

export default App;
