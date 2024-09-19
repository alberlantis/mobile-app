import {
  NostrKind,
  SingleRelayConnection,
  PublicKey,
  NostrEvent,
  Signer,
  prepareNostrEvent,
  Tag,
} from "@blowater/nostr-sdk";

import { EXPO_PUBLIC_SATLANTIS_RELAY } from "src/shared/constants/env";

function getRelayConnection() {
  const relay = SingleRelayConnection.New(EXPO_PUBLIC_SATLANTIS_RELAY || "", {
    log: false,
  });
  if (relay instanceof Error) {
    console.error(
      `Getting relay connection failed: ${relay.message}`,
      relay.cause,
    );
    throw new Error(
      `Failed to get connection to relay from pubKey: ${relay.message}`,
    );
  }
  return relay;
}

export async function getContactList(pubkey: PublicKey) {
  const relay = getRelayConnection();
  const event = await relay.getReplaceableEvent(pubkey, NostrKind.CONTACTS);
  await relay.close();

  if (event instanceof Error) {
    console.error(
      `Sending contact relay event failed: ${event.message}`,
      event.cause,
    );
    throw new Error(
      `Failed sending contact relay event, Reason: ${event.message}`,
    );
  }
  return event;
}

export async function prepareEvent<T extends NostrKind>(
  signer: Signer,
  kind: T,
  tags: Tag[],
) {
  const newEvent = await prepareNostrEvent(signer, {
    kind,
    content: "",
    tags,
  });
  if (newEvent instanceof Error) {
    console.error(
      `Creating new event for contact failed: ${newEvent.message}`,
      newEvent.cause,
    );
    throw new Error(
      `Failed to create new event for contact. Reason: ${newEvent.message}`,
    );
  }
  return newEvent;
}

export async function publishEvent(event: NostrEvent) {
  const relay = SingleRelayConnection.New(EXPO_PUBLIC_SATLANTIS_RELAY || "", {
    log: false,
  });
  if (relay instanceof Error) {
    console.error(`Publish event failed: ${relay.message}`, relay.cause);
    throw new Error(`Failed to publish event, Reason: ${relay.message}`);
  }
  const response = await relay.sendEvent(event);
  await relay.close();
  if (response instanceof Error) {
    console.error(`Send event failed: ${response.message}`, response.cause);
    throw new Error(`Failed to send event, Reason: ${response.message}`);
  }

  return response;
}
