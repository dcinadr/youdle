#!/bin/sh

# Minimal version to run CodeRunner
MINIMAL_VERSION=1.8.0

# Check if Java is present and the minimal version requirement
_java=`type java | awk '{ print $ NF }'`
CURRENT_VERSION=`"$_java" -version 2>&1 | awk -F'"' '/version/ {print $2}'`
minimal_version=`echo $MINIMAL_VERSION | awk -F'.' '{ print $2 }'`
current_version=`echo $CURRENT_VERSION | awk -F'.' '{ print $2 }'`
if [ $current_version ]; then
  if [ $current_version -lt $minimal_version ]; then
    echo "Error: Java version is too low to run CodeRunner. At least Java >= ${MINIMAL_VERSION} needed.";
    exit 1;
  fi
    else
      echo "Not able to find Java executable or version. Please check your Java installation.";
      exit 1;
fi

JAVA_ARGS="-Djava.net.preferIPv4Stack=true \
-Duser.timezone=UTC \
-Dfile.encoding=UTF-8 \
-XX:+HeapDumpOnOutOfMemoryError \
-Xdebug \
-Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=5005"
java $JAVA_ARGS -cp "*:../libs/*" com.backendless.coderunner.CodeRunnerLoader $@
