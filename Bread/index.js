/// <reference types="../CTAutocomplete" />
import PogObject from "PogData";

const data = new PogObject("Bread", {
  names: ["&r&azhadow_t"],
});
data.save();

register("Chat", function(event) {
  let msg = ChatLib.getChatMessage(event, true)
  for (let i = 0; i < data.names.length; i++) {
    if (msg.toLowerCase().includes(data.names[i])) {
      msgReplaced = msg.replace("and became a ghost.", "and went to get bread.")
      cancel(event)
      ChatLib.chat(msgReplaced)
      break;
    }
  }
}).setChatCriteria("became a ghost.").setContains();

register("command", (...args) => {
  if (args[0] == "add") {
    if (args[1]) {
      if (!data.names.includes(args.slice(1).join(" ").toLowerCase())) {
        data.names.push(args.slice(1).join(" ").toLowerCase())
        data.save()
        ChatLib.chat("§aThe mod now checks for " + args.slice(1).join(" ") + ".")
      } else {
        ChatLib.chat("§cName is already being checked.")
      }
    } else {
      ChatLib.chat("§cDidn't provide an Name.")
    }
  } else if (args[0] == "remove") {
    if (args[1]) {
      if (data.names.includes(args.slice(1).join(" ").toLowerCase())) {
        data.names.splice(data.names.indexOf(args.slice(1).join(" ").toLowerCase()),1)
        data.save()
        ChatLib.chat("§aThe mod no longer checks for " + args.slice(1).join(" ") + ".")
      } else {
        ChatLib.chat("§cName isn't being checked.")
      }
    } else {
      ChatLib.chat("§cDidn't provide an Name.")
    }
  } else if (args[0] == "list") {
    string = "§2Mod currently checks for:\n"
    for (let i = 0; i < data.names.length; i++) {
      if (i != data.names.length - 1) {
        string = string + "§a" + data.names[i] + ", "
      } else {
        string = string + "§a" + data.names[i]
      }
    }
    ChatLib.chat(string)
  } else {
    ChatLib.chat("§cUsage: /bread add/remove/list")
  }
}).setName("bread")
