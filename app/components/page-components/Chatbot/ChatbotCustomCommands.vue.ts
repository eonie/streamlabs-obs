import ChatbotBase from 'components/page-components/Chatbot/ChatbotBase.vue';
import { Component, Watch } from 'vue-property-decorator';
import { ICustomCommand } from 'services/chatbot';
import { Debounce } from 'lodash-decorators';
import ChatbotPagination from 'components/page-components/Chatbot/shared/ChatbotPagination.vue';

@Component({
  components: {
    ChatbotPagination,
  },
})
export default class ChatbotDefaultCommands extends ChatbotBase {
  searchQuery = '';

  get commands() {
    return this.chatbotApiService.state.customCommandsResponse.data;
  }

  get currentPage() {
    return this.chatbotApiService.state.customCommandsResponse.pagination.current;
  }

  get totalPages() {
    return this.chatbotApiService.state.customCommandsResponse.pagination.total;
  }

  mounted() {
    this.fetchCommands(1);
  }

  @Watch('searchQuery')
  @Debounce(1000)
  onQueryChangeHandler(value: string) {
    this.fetchCommands(this.currentPage, value);
  }

  fetchCommands(page: number = this.currentPage, query?: string) {
    this.chatbotApiService.fetchCustomCommands(page, query);
  }

  onOpenCommandWindowHandler(command?: ICustomCommand) {
    this.chatbotCommonService.openCustomCommandWindow(command);
  }

  onDeleteCommandHandler(command: ICustomCommand) {
    this.chatbotApiService.deleteCustomCommand(command.id);
  }

  onToggleEnableCommandHandler(commandId: string, index: number, isEnabled: boolean) {
    const commandToBeUpdated = this.commands[index];

    this.chatbotApiService.updateCustomCommand(commandId, {
      ...commandToBeUpdated,
      enabled: isEnabled,
    });
  }
}
