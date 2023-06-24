import { Injectable } from '@nestjs/common';
import { Command, Handler } from '@discord-nestjs/core';
import { Message } from 'discord.js';

@Command({
  name: 'hello',
  description: 'Return Hello world',
})
@Injectable()
export class BotGateway {
  @Handler()
  async hello(message: Message): Promise<void> {
    await message.reply('Hello world!');
  }
}
