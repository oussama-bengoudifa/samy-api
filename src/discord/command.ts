import { Injectable } from '@nestjs/common';
import { Command, Handler } from '@discord-nestjs/core';
import { Message } from 'discord.js';
import axios from 'axios';

@Command({
  name: 'command',
  description: 'Return Hello world',
})
@Injectable()
export class CommandBot {
  @Handler()
  async command(message: Message): Promise<void> {
    try {
      const response = await axios.get(
        'https://coffee.alexflipnote.dev/random.json',
      );
      const data = response.data;

      // Display the data on Discord
      await message.reply(JSON.stringify(data));
    } catch (error) {
      // Handle error appropriately
      await message.reply('Something wrong happened');
      console.error('Failed to fetch dog breeds:', error);
    }
  }
}
