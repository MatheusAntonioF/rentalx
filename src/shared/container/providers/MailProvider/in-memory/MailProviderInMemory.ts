import { IMailProvider } from '../IMailProvider';

class MailProviderInMemory implements IMailProvider {
  private messages: Record<string, unknown>[] = [];

  async sendMail(
    to: string,
    subject: string,
    variables: Record<string, unknown>,
    path: string
  ): Promise<void> {
    this.messages.push({ to, subject, variables, path });
  }
}

export { MailProviderInMemory };
