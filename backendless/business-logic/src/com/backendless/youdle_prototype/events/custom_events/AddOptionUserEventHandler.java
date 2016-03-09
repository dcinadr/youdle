package com.backendless.youdle_prototype.events.custom_events;

import com.backendless.Backendless;
import com.backendless.BackendlessUser;
import com.backendless.servercode.RunnerContext;
import com.backendless.servercode.annotation.BackendlessEvent;
import com.backendless.youdle_prototype.models.Option;

import java.util.*;

/**
 * AddOptionUserEventHandler handles custom event "AddOptionUser". This is accomplished with the
 * BackendlessEvent( "AddOptionUser" ) annotation. The event can be raised by either
 * the client-side or the server-side code (in other event handlers or timers).
 * The name of the class is not significant, it can be changed, since the event
 * handler is associated with the event only through the annotation.
 */
@BackendlessEvent( "AddOptionUser" )
public class AddOptionUserEventHandler extends com.backendless.servercode.extension.CustomEventHandler
{
    // only reason this is global is because it needs to be accessible from lambda expression
    private boolean userAlreadyExists = false;
    @Override
    public Map handleEvent( RunnerContext context, Map eventArgs )
    {
        this.userAlreadyExists = false;
        String optionObjectId = eventArgs.get("optionObjectId").toString();
        String cardObjectId = eventArgs.get("cardObjectId").toString();
        String userObjectId = eventArgs.get("userObjectId").toString();

        Map card = getCard(cardObjectId);
        Option option = getOption(optionObjectId);
        List<BackendlessUser> optionUsers = option.getUsers();

        checkIfUserAlreadyExist(userObjectId, optionUsers);
        if (this.userAlreadyExists)
        {
            // todo: log message "User has already been added to this option.  User: <user>, Option: <option>"
            //return card;
        }

        ArrayList<Map> cardOptions = (ArrayList<Map>) card.get("options");
        cardOptions.forEach(cardOption -> {
            ArrayList<Map> cardOptionUsers = (ArrayList<Map>) cardOption.get("users");
            cardOptionUsers.forEach(cardOptionUser -> {
               if (Objects.equals(cardOptionUser.get("objectId"), userObjectId))
               {
                   Option optionToRemoveUser = getOption(cardOption.get("objectId").toString());
                   List<BackendlessUser> optionToRemoveUserUsers = optionToRemoveUser.getUsers();
                   Optional<BackendlessUser> userToRemoveFromOption = optionToRemoveUserUsers
                           .stream()
                           .filter(o -> o.getObjectId() == userObjectId)
                           .findAny();
                   if (userToRemoveFromOption.isPresent())
                   {
                       optionToRemoveUserUsers.remove(userToRemoveFromOption.get());
                       optionToRemoveUser.setUsers(optionToRemoveUserUsers);
                       optionToRemoveUser.save();
                   }
               }
            });
        });

        // sudo
        // if user is already in list than exit eventhandler - x
        // if user is in the list of another option for the card than remove that user
        // add user
        //  - calc percentage
        // return entire card

        return card;
    }

    private Option getOption(String optionObjectId) {
        return Backendless.Data.of(Option.class).findById(optionObjectId);
    }

    private Map getCard(String cardObjectId) {
        List<String> cardRelations = new ArrayList<>();
        cardRelations.add("options");
        return Backendless.Data.of("card").findById(cardObjectId, cardRelations);
    }

    private void checkIfUserAlreadyExist(String userObjectId, List<BackendlessUser> users) {
        users.forEach(user -> {
            if (Objects.equals(user.getObjectId(), userObjectId))
            {
                this.userAlreadyExists = true;
                return;
            }
        });
    }

}
