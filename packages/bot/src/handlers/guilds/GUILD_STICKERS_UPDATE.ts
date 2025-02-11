import type { Bot, DiscordGatewayPayload, DiscordGuildStickersUpdate } from '../..'

export async function handleGuildStickersUpdate(bot: Bot, data: DiscordGatewayPayload, shardId: number): Promise<void> {
  const payload = data.d as DiscordGuildStickersUpdate

  bot.events.guildStickersUpdate?.(
    payload.stickers.map((sticker) => {
        sticker.guild_id = payload.guild_id
        return bot.transformers.sticker(bot, sticker)
    })
  )
}
