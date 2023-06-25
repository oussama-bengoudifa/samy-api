import { Module } from '@nestjs/common';
import { DiscordModule as DiscordBotModule } from '@discord-nestjs/core';
import { GatewayIntentBits } from 'discord.js';
import { BotGateway } from './bot.gateway';
import { CommandBot } from './command';
import { AnotherCommandBot } from './another.command';

@Module({
  imports: [
    DiscordBotModule.forRootAsync({
      useFactory: () => ({
        token:
          'MTExMTYzMzgzNTgwNTkyMTI5Mg.Ghs0FX.eaBvydeeKKaWFaSBOC2uaeTUBk7vxdlIkjWft4',
        discordClientOptions: {
          intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
        },
        registerCommandOptions: [
          {
            removeCommandsBefore: true,
          },
        ],
        failOnLogin: true,
      }),
    }),
  ],
  providers: [BotGateway, CommandBot, AnotherCommandBot],
})
export class DiscordModule {}
