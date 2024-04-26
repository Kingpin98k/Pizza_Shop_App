#!/bin/bash

cd ..

zip -r pizza_shop_app_v2.zip . -x "scripts/*" -x "node_modules/*" -x "dist/*"