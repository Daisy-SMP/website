<script lang="ts">
  import MethodCard from "$lib/MethodCard.svelte";
  import Step from "$lib/Step.svelte";
  import Screenshot from "$lib/Screenshot.svelte";
  import DownloadCard from "$lib/DownloadCard.svelte";

  let copied = $state(false);

  function copyArg() {
    navigator.clipboard.writeText("-javaagent:unsup.jar").then(() => {
      copied = true;
      setTimeout(() => (copied = false), 1500);
    });
  }
</script>

<svelte:head>
  <title>DaisySMP — Install the Modpack</title>
</svelte:head>

<div class="page-content">
  <h1 class="page-title">📦 Install the Modpack</h1>
  <p class="page-subtitle">
    Pick the method that works best for you. Both will get you in-game with the
    full modpack.
  </p>

  <div class="method-picker">
    <MethodCard
      badge="⭐ Recommended"
      badgeType="easy"
      title="Prism Launcher"
      description="Easiest setup — just download a zip and drag it in. No manual steps."
      href="#prism"
    />
    <MethodCard
      badge="Advanced"
      badgeType="advanced"
      title="Modrinth Launcher"
      description="A bit more setup, but it is better than the default."
      href="#modrinth"
    />
  </div>

  <!-- PRISM -->
  <div class="section" id="prism">
    <div class="section-header">
      <div class="section-icon icon-prism">🔷</div>
      <div class="section-header-text">
        <span class="badge badge-easy">Easiest</span>
        <h2>Prism Launcher</h2>
      </div>
    </div>

    <div class="steps">
      <Step num={1} title="Download the modpack zip">
        <p>Click the download button to grab the modpack file.</p>
        <DownloadCard
          icon="/img/archive.svg"
          href="/downloads/DaisySMP.zip"
          size="12KB"
        />
      </Step>

      <div class="step">
        <Step
          num={2}
          title="Drag the zip into Prism Launcher's Instances window"
        >
          <p>
            Open Prism Launcher. Simply <strong>drag and drop</strong> the
            <code>DaisySMP.zip</code> file directly onto the Instances window.
          </p>
          <Screenshot
            src="/img/dragging.gif"
            alt="Dragging the modpack to prism launcher"
          />
          <p class="note">
            💡 Once the import finishes, you're done! Click the instance and hit <strong
              >Launch</strong
            >.
          </p>
        </Step>
      </div>
    </div>
  </div>

  <div class="section-divider"></div>

  <!-- MODRINTH -->
  <div class="section" id="modrinth">
    <div class="section-header">
      <div class="section-icon icon-modrinth">🟢</div>
      <div class="section-header-text">
        <span class="badge badge-advanced">Advanced</span>
        <h2>Modrinth Launcher</h2>
      </div>
    </div>

    <div class="steps">
      <Step num={1} title="Download unsup">
        <p>
          Download the <strong>unsup</strong> jar from the Modrinth
          <strong>website</strong>:
          <a href="https://modrinth.com/mod/unsup" target="_blank"
            >modrinth.com/mod/unsup</a
          >. Grab the latest version's <code>.jar</code> file.
        </p>
        <Screenshot
          src="/img/download_unsup.gif"
          alt="Downloading unsup from modrinth"
        />
      </Step>

      <Step num={2} title="Download the unsup.ini config file">
        <p>
          Download the configuration file <code>unsup.ini</code>.
        </p>
        <DownloadCard
          icon="/img/text_file.svg"
          href="/downloads/unsup.ini"
          size="1.1KB"
        />
      </Step>

      <Step num={3} title="Rename the jar to unsup.jar"
        ><p>
          Find the downloaded jar file — it will be named something like <code
            >unsup-1.x.x.jar</code
          >. Rename it to exactly <strong>unsup.jar</strong> (remove the version number).
        </p>
        <Screenshot src="/img/unsup_rename.gif" alt="Renaming unsup" />
      </Step>

      <Step num={4} title="Create a new instance in Modrinth Launcher"
        ><p>
          Open the Modrinth Launcher and click the <strong
            >Create new instance</strong
          > button.
        </p>
        <Screenshot
          src="/img/instance_modrinth.gif"
          alt="Making an instance in modrinth"
        />
      </Step>

      <Step num={5} title="Choose Custom Setup and name your instance"
        ><p>
          Click <strong>Custom Setup</strong>. Name the instance
          <em>Daisy SMP</em> (or anything you like). Then set:
        </p>
        <p class="note">
          🧵 <strong>Loader:</strong> Fabric — latest version (currently
          <strong>0.19.2</strong>)<br />
          🎮 <strong>Minecraft version:</strong> <strong>26.1.2</strong>
        </p>
        <p style="margin-top:10px;">
          Hit <strong>Create</strong> to finish setting up the instance.
        </p>
      </Step>

      <Step num={6} title="Open the instance folder"
        ><p>
          Click on your new instance in either the sidebar or the Library page.
          Then click the <strong>⋯ three-dot menu</strong> at the top right of
          the window and select <strong>Open Folder</strong>.
        </p>
        <Screenshot
          src="/img/folder_modrinth.gif"
          alt="Opening the instance's folder"
        />
      </Step>

      <Step num={7} title="Drop unsup.jar and unsup.ini into the folder"
        ><p>
          Drag both <strong>unsup.jar</strong> and <strong>unsup.ini</strong> into
          the instance folder that just opened. Then close the file explorer and go
          back to the Modrinth Launcher.
        </p>
      </Step>

      <Step num={8} title="Add the Java agent argument"
        ><p>
          Click the <strong>⚙️ Settings cogwheel</strong> button at the top
          right of the instance window. In the settings panel that appears,
          click <strong>Java & Memory</strong> on the left side. Enable
          <strong>Custom Java Arguments</strong>, then type or paste the
          following into the text box:
        </p>
        <div class="code-block">
          <div class="code-block-header">
            <span>Java Argument</span>
            <button class="copy-btn" onclick={copyArg}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre>-javaagent:unsup.jar</pre>
        </div>
        <Screenshot
          src="/img/javaagent_modrinth.gif"
          alt="Adding the java agent to the instance"
        />
      </Step>
    </div>
  </div>

  <div class="done-banner">
    <div class="done-icon">🎉</div>
    <div>
      <h3>You're all set!</h3>
      <p>
        Your instance is configured with unsup and will auto-update the modpack
        every time you launch. Hit Play and join the server!
      </p>
    </div>
  </div>
</div>

<style>
</style>
