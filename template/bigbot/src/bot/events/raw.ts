import { DiscordUnavailableGuild } from "discordeno";
import { prisma } from "../../prisma";
import { bot } from "../bot";
import { updateGuildCommands, usesLatestCommandVersion } from "../utils/slash/updateDevCommands";

/** To prevent updating every guild when a shard goes ready we have to ignore them using this */
// export const initialyLoadingGuildIds = new Set<bigint>()

export function setRawEvent() {
  bot.events.raw = async function (_, data) {
    if (data.t === "GUILD_DELETE") {
      const id = (data.d as DiscordUnavailableGuild).id;

      await prisma.commands.deleteOne({ id });
      return;
    }

    const id = bot.transformers.snowflake(
      (data.t && ["GUILD_UPDATE", "GUILD_CREATE"].includes(data.t)
        ? // deno-lint-ignore no-explicit-any
          (data.d as any)?.id
        : // deno-lint-ignore no-explicit-any
          (data.d as any)?.guild_id) ?? "",
    );

    // The GUILD_CREATE event came from a shard loaded event so ignore it
    if (["READY", "GUILD_LOADED_DD", "GUILD_CREATE", null].includes(data.t)) return;

    // console.log({ id, v: await usesLatestCommandVersion(id) })

    if (!id || (await usesLatestCommandVersion(id))) return;
    // dev guild
    if (id === 547046977578336286n) return;

    // NEW GUILD AVAILABLE
    bot.logger.info(`[Slash Setup] Installing Slash commands on Guild ${id} event type: ${data.t}`);
    await updateGuildCommands(bot, id).catch(bot.logger.error);
  };
}