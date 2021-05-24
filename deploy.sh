#!/bin/sh
hugo -t hello
hugo --baseUrl="https://nuoea.com/"
hugo --cleanDestinationDir --forceSyncStatic --gc --ignoreCache --minify