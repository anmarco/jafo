# JAFO
Just a folder organizer CLI tool to organize files inside a folder

## Installation

`npm install -g jafo` 

## Usage

For default configs
`jafo -p .`

for custom configs
`jafo -c <path-to-config.yaml>`

## Custom config file

Custom config files should be written in YAML, using the following schema

```yaml
path: /folder/to/organize
folder:
  - name: vids
    formats: ['mp4', 'avi', 'wmv', 'mkv', 'webm', 'mov']
  - name: 3dprint
    formats: ['stl', 'gcode']
``` 