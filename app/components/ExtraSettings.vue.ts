import Vue from 'vue';
import electron from 'electron';
import { Component } from 'vue-property-decorator';
import { CacheUploaderService } from 'services/cache-uploader';
import { Inject } from 'util/injector';
import ObsBoolInput from 'components/obs/inputs/ObsBoolInput.vue';
import { CustomizationService } from 'services/customization';
import { IObsInput } from 'components/obs/inputs/ObsInput';
import { StreamlabelsService } from 'services/streamlabels';
import { OnboardingService } from 'services/onboarding';
import { WindowsService } from 'services/windows';
import { UserService } from 'services/user';
import { StreamingService } from 'services/streaming';
import { $t } from 'services/i18n';

@Component({
  components: { ObsBoolInput },
})
export default class ExtraSettings extends Vue {
  @Inject() cacheUploaderService: CacheUploaderService;
  @Inject() customizationService: CustomizationService;
  @Inject() streamlabelsService: StreamlabelsService;
  @Inject() onboardingService: OnboardingService;
  @Inject() windowsService: WindowsService;
  @Inject() userService: UserService;
  @Inject() streamingService: StreamingService;

  cacheUploading = false;

  get streamInfoUpdateModel(): IObsInput<boolean> {
    return {
      name: 'stream_info_udpate',
      description: $t('Confirm stream title and game before going live'),
      value: this.customizationService.state.updateStreamInfoOnLive,
    };
  }

  setStreamInfoUpdate(model: IObsInput<boolean>) {
    this.customizationService.setUpdateStreamInfoOnLive(model.value);
  }

  showCacheDir() {
    electron.remote.shell.showItemInFolder(electron.remote.app.getPath('userData'));
  }

  deleteCacheDir() {
    if (
      confirm(
        $t('WARNING! You will lose all scenes, sources, and settings. This cannot be undone!'),
      )
    ) {
      electron.remote.app.relaunch({ args: ['--clearCacheDir'] });
      electron.remote.app.quit();
    }
  }

  uploadCacheDir() {
    this.cacheUploading = true;
    this.cacheUploaderService.uploadCache().then(file => {
      electron.remote.clipboard.writeText(file);
      alert(
        $t(
          // tslint:disable-next-line:max-line-length
          'Your cache directory has been successfully uploaded.  The file name %{file} has been copied to your clipboard.',
          { file },
        ),
      );
      this.cacheUploading = false;
    });
  }

  restartStreamlabelsSession() {
    this.streamlabelsService.restartSession().then(result => {
      if (result) alert($t('Streamlabels session has been succesfully restarted!'));
    });
  }

  runAutoOptimizer() {
    this.onboardingService.start({ isOptimize: true });
    this.windowsService.closeChildWindow();
  }

  get isTwitch() {
    return this.userService.isLoggedIn() && this.userService.platform.type === 'twitch';
  }

  get isRecordingOrStreaming() {
    return this.streamingService.isStreaming || this.streamingService.isRecording;
  }
}
