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
    @Override
    public Map handleEvent( RunnerContext context, Map eventArgs )
    {
        String optionObjectId = eventArgs.get("optionObjectId").toString();  // option that we are adding the user
        String cardObjectId = eventArgs.get("cardObjectId").toString(); // card that the option is included
        String userObjectId = eventArgs.get("userObjectId").toString(); // user that we are adding to the option

        Map card = getCardMap(cardObjectId);
        Option option = getOption(optionObjectId);

        try
        {
            RemoveUserFromAllOptions(userObjectId, card);

            addUserToOption(userObjectId, option);

            calculatePercentages(card);

            // update card with changes made
            card = getCardMap(cardObjectId);
        }
        catch (Exception e)
        {
            Exception x = e;
        }

        // sudo
        // if user is already in list than exit eventhandler - x
        // if user is in the list of another option for the card than remove that user
        // add user
        //  - calc percentage
        // return entire card

        return card;
    }

    private void calculatePercentages(Map card) {
        Option[] options = getAllOptionsFromCard(card);
        int totalVotes = 0;
        for (Option cardOption : options) {
            totalVotes += cardOption.getUsers().size();
        }
        for (Option cardOption : options) {
            Option optionToUpdate = getOption(cardOption.getObjectId());
            int userCount = optionToUpdate.getUsers().size();
            double percentage = userCount / totalVotes;
            percentage = percentage * 100;
            optionToUpdate.setPercentage(percentage);
            optionToUpdate.setPercentageDisplayed(percentage + "%");
            optionToUpdate.save();
        }
    }

    private void addUserToOption(String userObjectId, Option option)
    {
        BackendlessUser user = Backendless.Data.of(BackendlessUser.class).findById(userObjectId);
        option.getUsers().add(user);
        option.save();
    }

    private void RemoveUserFromAllOptions(String userObjectId, Map card)
    {
        Option[] options = getAllOptionsFromCard(card);
        for (Option option : options) {
            // get all users for this option of this card
            ArrayList<BackendlessUser> users = getOptionUsers(option);
            for (BackendlessUser user : users)
            {
                // if user found in list of users
                if (Objects.equals(user.getObjectId(), userObjectId))
                {
                    Option updatedOption = removeUserFromOption(userObjectId, option);
                    // todo - log something here
                    break;
                }
            }
        }
    }

    // will return the same Option if user was not removed, otherwise the updated user is returned
    private Option removeUserFromOption(String userObjectId, Option cardOption)
    {
        Option updatedOption = cardOption;
        Option optionToUpdate = getOption(cardOption.getObjectId());
        BackendlessUser userToRemove = getUserFromOptionUsers(userObjectId, optionToUpdate);
        if (userToRemove != null)
        {
            optionToUpdate.getUsers().remove(userToRemove);
            updatedOption = optionToUpdate.save();
        }
        return updatedOption;
    }

    private BackendlessUser getUserFromOptionUsers(String userObjectId, Option option)
    {
        BackendlessUser userToRemove = null;
        for (BackendlessUser backendlessUser : option.getUsers())
        {
            if (Objects.equals(backendlessUser.getObjectId(), userObjectId))
            {
                userToRemove = backendlessUser;
                break;
            }
        }
        return userToRemove;
    }

    private ArrayList<BackendlessUser> getOptionUsers(Option option)
    {
        return (ArrayList<BackendlessUser>) option.getUsers();
    }

    private Option[] getAllOptionsFromCard(Map card)
    {
        return (Option[]) card.get("options");
    }

    private Option getOption(String optionObjectId)
    {
        return Backendless.Data.of(Option.class).findById(optionObjectId);
    }

    private Map getCardMap(String cardObjectId)
    {
        List<String> cardRelations = new ArrayList<>();
        cardRelations.add("options");
        cardRelations.add("user");
        return Backendless.Data.of("card").findById(cardObjectId, cardRelations);
    }
}
