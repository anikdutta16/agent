export const reactSidebarComponentTemplate = `import { {{COMPONENT_NAME}}, type {{COMPONENT_NAME}}Props } from "@inkeep/agents-ui";

const props: {{COMPONENT_NAME}}Props = {
  baseSettings: {{BASE_SETTINGS}},
  aiChatSettings: {
    appId: "{{APP_ID}}",
    baseUrl: "{{BASE_URL}}",
{{EXTRA_AI_CHAT_SETTINGS}}
  },
};

export const AgentFabricWidget = () => {
  return (
    <>
      <button data-agent-fabric-sidebar-chat-trigger>
        Toggle sidebar
      </button>
      <{{COMPONENT_NAME}} {...props} />
    </>
  );
};`;
