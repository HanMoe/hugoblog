#!/bin/sh
hugo -t hello # 我使用的是even主题，所以是 -t even
hugo --baseUrl="https://nuoea.com/"
hugo --cleanDestinationDir --forceSyncStatic --gc --ignoreCache --minify