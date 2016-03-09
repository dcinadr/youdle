package com.backendless.youdle_prototype.events.persistence_service;

import com.backendless.servercode.ExecutionResult;
import com.backendless.servercode.RunnerContext;
import com.backendless.servercode.annotation.Asset;
import com.backendless.youdle_prototype.models.Option;
        
/**
* OptionTableEventHandler handles events for all entities. This is accomplished
* with the @Asset( "option" ) annotation. 
* The methods in the class correspond to the events selected in Backendless
* Console.
*/
    
@Asset( "option" )
public class OptionTableEventHandler extends com.backendless.servercode.extension.PersistenceExtender<Option>
{

  @Override
  public void beforeUpdate( RunnerContext context, Option option ) throws Exception
  {

  }

  @Override
  public void afterUpdate( RunnerContext context, Option option, ExecutionResult<Option> result ) throws Exception
  {
    // add your code here
  }
    
}
        