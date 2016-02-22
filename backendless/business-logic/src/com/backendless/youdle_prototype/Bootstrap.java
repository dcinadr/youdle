
package com.backendless.youdle_prototype;

import com.backendless.Backendless;
import com.backendless.servercode.IBackendlessBootstrap;

import com.backendless.youdle_prototype.models.Option;

public class Bootstrap implements IBackendlessBootstrap
{
            
  @Override
  public void onStart()
  {
    Backendless.setUrl( "https://api.backendless.com" );
    Backendless.initApp( "E11DA057-CE8C-0C31-FF22-59965520EB00", "229E6EBF-479A-3E67-FF2A-AC32CD928B00","v1");

    Backendless.Persistence.mapTableToClass( "option", Option.class );
    // add your code here
  }
    
  @Override
  public void onStop()
  {
    // add your code here
  }
    
}
        