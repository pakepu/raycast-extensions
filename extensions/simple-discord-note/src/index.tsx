import {
  Action,
  ActionPanel,
  Form,
  closeMainWindow,
  getPreferenceValues,
  showToast,
} from "@raycast/api";
import fetch from "node-fetch";

type Preferences = {
  webhookUrl: string;
};

type Values = {
  content: string;
};

// noinspection JSUnusedGlobalSymbols
export default function Command() {
  async function handleSubmit(values: Values) {
    const preference = getPreferenceValues<Preferences>();

    // https://gist.github.com/dragonwocky/ea61c8d21db17913a43da92efe0de634
    await fetch(preference.webhookUrl, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "Note Bot",
        embeds: [
          {
            color: 11730954,
            description: values.content,
          },
        ],
      }),
    });
    // const client = new Client({ intents: [GatewayIntentBits.Guilds] });
    // client.login(process.env.DISCORD_TOKEN);
    //
    // client.once(Events.ClientReady, async (c) => {
    //   const channel = c.channels.cache.get("id");
    //   if (!channel) throw new Error("Channell not found!");
    //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   // @ts-ignore
    //   channel.send(values.log);
    // });

    await showToast({
      title: "Notes written",
      message: "Simple Discord Note",
    });
    await closeMainWindow({ clearRootSearch: true });
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextArea id="content" title="Content" placeholder="Content" />
    </Form>
  );
}
