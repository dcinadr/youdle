package com.backendless.youdle_prototype.models;

import com.backendless.Backendless;
import com.backendless.BackendlessUser;

public class Option
{
  private String percentageDisplayed;
  private String text;
  private java.util.Date created;
  private String ownerId;
  private java.util.List<BackendlessUser> users;
  private String objectId;
  private Double percentage;
  private java.util.Date updated;

  public String getPercentageDisplayed()
  {
    return this.percentageDisplayed;
  }

  public String getText()
  {
    return this.text;
  }

  public java.util.Date getCreated()
  {
    return this.created;
  }

  public String getOwnerId()
  {
    return this.ownerId;
  }

  public java.util.List<BackendlessUser> getUsers()
  {
    return this.users;
  }

  public String getObjectId()
  {
    return this.objectId;
  }

  public Double getPercentage()
  {
    return this.percentage;
  }

  public java.util.Date getUpdated()
  {
    return this.updated;
  }


  public void setPercentageDisplayed( String percentageDisplayed )
  {
    this.percentageDisplayed = percentageDisplayed;
  }

  public void setText( String text )
  {
    this.text = text;
  }

  public void setCreated( java.util.Date created )
  {
    this.created = created;
  }

  public void setOwnerId( String ownerId )
  {
    this.ownerId = ownerId;
  }

  public void setUsers( java.util.List<BackendlessUser> users )
  {
    this.users = users;
  }

  public void setObjectId( String objectId )
  {
    this.objectId = objectId;
  }

  public void setPercentage( Double percentage )
  {
    this.percentage = percentage;
  }

  public void setUpdated( java.util.Date updated )
  {
    this.updated = updated;
  }

  public Option save()
  {
    return Backendless.Data.of( Option.class ).save( this );
  }

  public Long remove()
  {
    return Backendless.Data.of( Option.class ).remove( this );
  }

  public static Option findById( String id )
  {
    return Backendless.Data.of( Option.class ).findById( id );
  }

  public static Option findFirst()
  {
    return Backendless.Data.of( Option.class ).findFirst();
  }

  public static Option findLast()
  {
    return Backendless.Data.of( Option.class ).findLast();
  }
}