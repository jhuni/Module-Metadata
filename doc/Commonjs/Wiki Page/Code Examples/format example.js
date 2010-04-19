{

    // This uses the format:
    // language, name, version, authority
    "id": "js-Utils.slurp-1.0-jsan+jhuni",

    // This makes the module return exports like in Modules/1.0.
    "returns": "exports",

    // This will make sure XMLHttpRequest works in IE.
    "builtins": ["XMLHttpRequest"],

    // This will pass the variables io and each to your module.
    "use": {

        "each": "js-Utils.each-1.0-jsan+jhuni",

        "io": {

            // This is for rhino users:
            "java": "java-java.io-1.4-sun",

            // This is for parrot users:
            "perl": "perl-File::Slurp-1.2-cpan+DROLSKY"

        }

    }

}
