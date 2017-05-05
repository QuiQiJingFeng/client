#!/bin/sh

pbjs protocol.proto -t commonjs > protocol.js

cp protocol.js ../assets/resources/proto
