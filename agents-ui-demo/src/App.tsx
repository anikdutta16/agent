import './App.css';
import { InkeepEmbeddedChat } from '@agent-fabric/agents-ui';

function App() {
  return (
    <div className="agent-fabric-chat-container">
      <InkeepEmbeddedChat
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
