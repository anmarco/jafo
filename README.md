# Archivator
CLI tool to organize files inside a folder

## Installation

`npm install -g jafo` 

## Usage

For default configs
`archivator -p .`

for custom configs
`archivator -c <path-to-config.yaml>`

## Custom config file

Custom config files should be written in YAML, using the following schema

```yaml
path: ~/folder/to/vaccum
folder:
  - name: vids
    formats: ['mp4', 'avi', 'wmv', 'mkv', 'webm', 'mov']
  - name: 3dprint
    formats: ['stl', 'gcode']
``` 