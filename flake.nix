{
  description = "Daisy smp website";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs = { self, nixpkgs }: 
    let
      systems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      forAllSystems = nixpkgs.lib.genAttrs systems;
    in
    {
      devShells = forAllSystems (system:
        let
          pkgs = import nixpkgs { inherit system; };
          mp42gif = (import ./scripts/mp42gif.nix { inherit pkgs; });
        in
        {
          default = pkgs.mkShell {
            packages = with pkgs; [
              nodejs
              svelte-language-server
              mp42gif
            ];
          };
        }
      );
    };
}