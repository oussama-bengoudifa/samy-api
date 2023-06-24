import { Module } from '@nestjs/common';
import { DiscordModule as DiscordBotModule } from '@discord-nestjs/core';
import { GatewayIntentBits } from 'discord.js';
import { BotGateway } from './bot.gateway';

@Module({
  imports: [
    DiscordBotModule.forRootAsync({
      useFactory: () => ({
        token:
          'MTExMTYzMzgzNTgwNTkyMTI5Mg.GmDKr7.Sm-djCrbX3Z_7kuj5xKVdFk30OnY9E63umqePI',
        discordClientOptions: {
          intents: [GatewayIntentBits.Guilds],
        },
      }),
    }),
  ],
  providers: [BotGateway],
})
export class DiscordModule {}
