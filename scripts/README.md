
To install Deno and run your TypeScript file, follow these steps:

1. Open a terminal or command prompt.

2. Install Deno by running the following command:
   ```
   curl -fsSL https://deno.land/x/install/install.sh | sh
   ```

   Alternatively, you can use the package manager `brew` (for macOS/Linux) or `chocolatey` (for Windows) if you have them installed:

   For macOS/Linux:
   ```
   brew install deno
   ```

   For Windows (with chocolatey):
   ```
   choco install deno
   ```

3. Once Deno is installed, check that it's working correctly by running:
   ```
   deno --version
   ```

   You should see the version number if Deno was installed successfully.

4. To run your TypeScript file, use the `deno run` command followed by the file path:
   ```
   deno run -A ./src/to-markdown.ts
   Example usage: to-markdown {url}

   ```

    ### Available flags
    |     |     |
    | --- | --- |
    | `--no-markdown` | only output in plain text
    | `--write` | write to `articles` dir

    - Done, you have successfully converted a blog link to a MD file
    - now do the necessary changes following the *[instructions](https://github.com/Web3secNews/blog/#%EF%B8%8F-writing-and-submitting-a-blog)* & `get your blog published` 🥳🚀
