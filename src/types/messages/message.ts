import { ChannelMention } from "../channels/channel_mention.ts";
import { Embed } from "../embeds/embed.ts";
import { SnakeCaseProps } from "../util.ts";
import { Attachment } from "./attachment.ts";
import { MessageActivity } from "./message_activity.ts";
import { MessageApplication } from "./message_application.ts";
import { MessageReference } from "./message_reference.ts";
import { MessageSticker } from "./message_sticker.ts";
import { DiscordReaction } from "./reaction.ts";

export interface Message {
  /** id of the message */
  id: string;
  /** id of the channel the message was sent in */
  channel_id: string;
  /** id of the guild the message was sent in */
  guild_id?: string;
  /**
     * The author of this message (not guaranteed to be a valid user)
     * Note: The author object follows the structure of the user object, but is only a valid user in the case where the message is generated by a user or bot user. If the message is generated by a webhook, the author object corresponds to the webhook's id, username, and avatar. You can tell if a message is generated by a webhook by checking for the webhook_id on the message object.
     */
  author: User;
  /**
     * Member properties for this message's author
     * Note: The member object exists in `MESSAGE_CREATE` and `MESSAGE_UPDATE` events from text-based guild channels. This allows bots to obtain real-time member data without requiring bots to store member state in memory.
     */
  member?: Partial<Member>;
  /** Contents of the message */
  content: string;
  /** When this message was sent */
  timestamp: string;
  /** When this message was edited (or null if never) */
  edited_timestamp: string | null;
  /** Whether this was a TTS message */
  tts: boolean;
  /** Whether this message mentions everyone */
  mention_everyone: boolean;
  /**
     * Users specifically mentioned in the message
     * Note: The user objects in the mentions array will only have the partial member field present in `MESSAGE_CREATE` and `MESSAGE_UPDATE` events from text-based guild channels.
     */
  mentions: User[];
  /** Roles specifically mentioned in this message */
  mention_roles: string[];
  /**
     * Channels specifically mentioned in this message
     * Note: Not all channel mentions in a message will appear in `mention_channels`. Only textual channels that are visible to everyone in a lurkable guild will ever be included. Only crossposted messages (via Channel Following) currently include `mention_channels` at all. If no mentions in the message meet these requirements, this field will not be sent.
     */
  mention_channels?: ChannelMention[];
  /** Any attached files */
  attachments: Attachment[];
  /** Any embedded content */
  embeds: Embed[];
  /** Reactions to the message */
  reactions?: DiscordReaction[];
  /** Used for validating a message was sent */
  nonce?: number | string;
  /** Whether this message is pinned */
  pinned: boolean;
  /** If the message is generated by a webhook, this is the webhook's id */
  webhook_id?: string;
  /** Type of message */
  type: MessageTypes;
  /** Sent with Rich Presence-related chat embeds */
  activity?: MessageActivity;
  /** Sent with Rich Presence-related chat embeds */
  application?: MessageApplication;
  /** Reference data sent with crossposted messages and replies */
  message_reference?: MessageReference;
  /** Message flags combined as a bitfield */
  flags?: number;
  /** The stickers sent with the message (bots currently can only receive messages with stickers, not send) */
  stickers?: MessageSticker;
  /**
     * The message associated with the `message_reference`
     * Note: This field is only returned for messages with a `type` of `19` (REPLY). If the message is a reply but the `referenced_message` field is not present, the backend did not attempt to fetch the message that was being replied to, so its state is unknown. If the field exists but is null, the referenced message was deleted.
     */
  referenced_message?: Message;
  /** Sent if the message is a response to an Interaction */
  interaction?: MessageInteraction;
}

/** https://discord.com/developers/docs/resources/channel#message-object */
export type DiscordMessage = SnakeCaseProps<Message>;
