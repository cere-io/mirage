#!/bin/bash

aws s3 cp index_prod.html s3://mirage.cere.io/index.html --profile cerebellum
aws s3 sync dist/ s3://mirage.cere.io/dist --profile cerebellum
aws s3 sync app/ s3://mirage.cere.io/app --exclude "*.ts" --profile cerebellum
aws s3 sync assets/ s3://mirage.cere.io/assets --exclude "*.scss" --profile cerebellum
