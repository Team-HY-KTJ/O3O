/* eslint-disable */
import 'dotenv/config';
import { REST, Routes } from 'discord.js';
import commands from '../data/slashCommands.js';

function commandsAreEqual(existing, updated) {
    if (existing.length !== updated.length) return false;

    for (let i = 0; i < existing.length; i++) {
        const existingCommand = existing[i];
        const updatedCommand = updated[i];

        if (
            existingCommand.name !== updatedCommand.name ||
            existingCommand.description !== updatedCommand.description ||
            !optionsAreEqual(existingCommand.options, updatedCommand.options)
        ) {
            return false;
        }
    }
    return true;
}

function optionsAreEqual(existingOptions, updatedOptions) {
    if (!existingOptions && !updatedOptions) return true;
    if (!existingOptions || !updatedOptions) return false;
    if (existingOptions.length !== updatedOptions.length) return false;

    for (let i = 0; i < existingOptions.length; i++) {
        const existingOption = existingOptions[i];
        const updatedOption = updatedOptions[i];

        if (
            existingOption.name !== updatedOption.name ||
            existingOption.description !== updatedOption.description ||
            existingOption.type !== updatedOption.type ||
            existingOption.required !== updatedOption.required
        ) {
            return false;
        }
    }
    return true;
}

export default async function registerSlashCommands(guildId, token) {
    const appID = process.env.APPLICATION_ID; // .env에서 불러오기
    console.log('appID:', appID);
    console.log(`Guild ${guildId}: 슬래시 커맨드 등록/갱신 시작`);

    try {
        const rest = new REST({ version: '10' }).setToken(token);

        // 이미 등록된 명령어 가져오기
        const existingCommands = await rest.get(
            Routes.applicationGuildCommands(appID, guildId)
        );

        // 기존 명령어와 현재 commands가 동일하면 등록 스킵
        if (commandsAreEqual(existingCommands, commands)) {
            console.log(`Guild ${guildId} 이미 최신 명령어가 등록됨`);
            return;
        }

        // 변경사항이 있으므로 등록/갱신
        await rest.put(Routes.applicationGuildCommands(appID, guildId), {
            body: commands,
        });
        console.log(`Guild ${guildId}: 슬래시 커맨드 등록/갱신 완료`);
    } catch (error) {
        console.error('Slash command registration error:', error);
    }
}
