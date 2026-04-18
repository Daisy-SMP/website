{ pkgs, ... }:

pkgs.writeShellScriptBin "mp42gif" ''
  VIDEO="$1"
  SPEED="''${2:-2}"
  BASE_NAME="$(basename "$VIDEO" | sed 's/\.[^.]*$//')"

  ${pkgs.ffmpeg}/bin/ffmpeg -i "$VIDEO" \
    -vf "fps=20,scale=800:-1:flags=lanczos,setpts=(1/$SPEED)*PTS,palettegen" __palette.png

  ${pkgs.ffmpeg}/bin/ffmpeg -i "$VIDEO" -i __palette.png \
    -filter_complex "[0:v]fps=20,scale=800:-1:flags=lanczos,setpts=(1/$SPEED)*PTS[v];[v][1:v]paletteuse=dither=sierra2_4a" \
    "$BASE_NAME.gif"

  rm __palette.png
''