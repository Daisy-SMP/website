<script lang="ts">
  import CardWithLink from "$components/CardWithLink.svelte";
  import Step from "$components/Step.svelte";
  import Screenshot from "$components/Screenshot.svelte";
  import DownloadCard from "$components/DownloadCard.svelte";
  import DoneBanner from "$components/DoneBanner.svelte";
  import CopyPasteBox from "$components/CopyPasteBox.svelte";
  import Package from "$components/icons/Package.svelte";
  import PrismLauncherLogo from "$components/icons/PrismLauncherLogo.svelte";
  import ModrinthLogo from "$components/icons/ModrinthLogo.svelte";
  import Archive from "$components/icons/Archive.svelte";
  import ConfigurationFile from "$components/icons/ConfigurationFile.svelte";
  import Minecraft from "$components/icons/Minecraft.svelte";
  import Fabric from "$components/icons/Fabric.svelte";

  let copied = $state(false);

  let fabricVersion = $state<string | null>(null);

  $effect(() => {
    fetch(
      "https://maven.fabricmc.net/net/fabricmc/fabric-loader/maven-metadata.xml",
    )
      .then((res) => res.text())
      .then((xml) => {
        const match = xml.match(/<release>(.*?)<\/release>/);
        if (match) fabricVersion = match[1];
      })
      .catch(() => null);
  });
</script>

<svelte:head>
  <title>DaisySMP — Install the Modpack</title>
</svelte:head>

<div class="page-content">
  <h1 class="page-title"><Package /> Install the Modpack</h1>
  <p class="page-subtitle">
    Pick the method that works best for you. Both will get you in-game with the
    full modpack.
  </p>

  <div class="method-picker">
    <CardWithLink
      badge="Recommended"
      badgeType="easy"
      title="Prism Launcher"
      description="Easiest setup — just download a zip and drag it in. No manual steps."
      href="#prism"
      star
    />
    <CardWithLink
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
      <div class="section-icon icon-prism">
        <PrismLauncherLogo width="1.25em" height="1.25em" />
      </div>
      <div class="section-header-text">
        <span class="badge badge-easy">Easiest</span>
        <h2>Prism Launcher</h2>
      </div>
    </div>

    <div class="steps">
      <Step reset title="Download the modpack zip">
        <p>Click the download button to grab the modpack file.</p>
        <DownloadCard href="/downloads/DaisySMP.zip" size="12KB">
          {#snippet icon()}
            <Archive width={26} height={26} />
          {/snippet}
        </DownloadCard>
      </Step>

      <div class="step">
        <Step title="Drag the zip into Prism Launcher's Instances window">
          <p>
            Open Prism Launcher. Simply <strong>drag and drop</strong> the
            <code>DaisySMP.zip</code> file directly onto the Instances window.
          </p>
          <Screenshot
            src="/img/dragging.gif"
            alt="Dragging the modpack to prism launcher"
          />
        </Step>
      </div>
    </div>
  </div>
  <DoneBanner />

  <div class="section-divider"></div>

  <!-- MODRINTH -->
  <div class="section" id="modrinth">
    <div class="section-header">
      <div class="section-icon icon-modrinth">
        <ModrinthLogo width="1.25em" height="1.25em" />
      </div>
      <div class="section-header-text">
        <span class="badge badge-advanced">Advanced</span>
        <h2>Modrinth Launcher</h2>
      </div>
    </div>

    <div class="steps">
      <Step reset title="Download unsup">
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

      <Step title="Download the unsup.ini config file">
        <p>
          Download the configuration file <code>unsup.ini</code>.
        </p>
        <DownloadCard href="/downloads/unsup.ini" size="1.1 KB">
          {#snippet icon()}
            <ConfigurationFile width={26} height={26} />
          {/snippet}
        </DownloadCard>
      </Step>

      <Step title="Rename the jar to unsup.jar"
        ><p>
          Find the downloaded jar file — it will be named something like <code
            >unsup-1.x.x.jar</code
          >. Rename it to exactly <strong>unsup.jar</strong> (remove the version number).
        </p>
        <Screenshot src="/img/unsup_rename.gif" alt="Renaming unsup" />
      </Step>

      <Step title="Create a new instance in Modrinth Launcher"
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

      <Step title="Choose Custom Setup and name your instance"
        ><p>
          Click <strong>Custom Setup</strong>. Name the instance
          <em>Daisy SMP</em> (or anything you like). Then set:
        </p>
        <p class="note">
          <Fabric /> <strong>Loader:</strong> Fabric — latest version (currently
          <strong>{fabricVersion ?? "loading..."}</strong>)<br />
          <Minecraft /> <strong>Minecraft version:</strong>
          <strong>26.1.2</strong>
        </p>
        <p style="margin-top:10px;">
          Hit <strong>Create</strong> to finish setting up the instance.
        </p>
      </Step>

      <Step title="Open the instance folder"
        ><p>
          Click on your new instance in either the sidebar or the Library page.
          Then click the <strong>⋮ three-dot menu</strong> at the top right of
          the window and select <strong>Open Folder</strong>.
        </p>
        <Screenshot
          src="/img/folder_modrinth.gif"
          alt="Opening the instance's folder"
        />
      </Step>

      <Step title="Drop unsup.jar and unsup.ini into the folder"
        ><p>
          Drag both <strong>unsup.jar</strong> and <strong>unsup.ini</strong> into
          the instance folder that just opened. Then close the file explorer and go
          back to the Modrinth Launcher.
        </p>
      </Step>

      <Step title="Add the Java agent argument"
        ><p>
          Click the <strong>⚙️ Settings cogwheel</strong> button at the top
          right of the instance window. In the settings panel that appears,
          click <strong>Java & Memory</strong> on the left side. Enable
          <strong>Custom Java Arguments</strong>, then type or paste the
          following into the text box:
        </p>
        <CopyPasteBox title="Java Argument" text="-javaagent:unsup.jar" />
        <Screenshot
          src="/img/javaagent_modrinth.gif"
          alt="Adding the java agent to the instance"
        />
      </Step>
    </div>
  </div>

  <DoneBanner />
</div>
