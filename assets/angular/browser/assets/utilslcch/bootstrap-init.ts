import * as bootstrap from 'bootstrap';

export const initializeBootstrapFeatures = () => {
  // --------
  // Tooltips
  // --------
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((tooltip) => {
    new bootstrap.Tooltip(tooltip);
  });

  // --------
  // Popovers
  // --------
  document.querySelectorAll('[data-bs-toggle="popover"]').forEach((popover) => {
    new bootstrap.Popover(popover);
  });

  // -------------------------------
  // Toasts
  // -------------------------------
  // const toastPlacement = document.getElementById('toastPlacement');
  // if (toastPlacement) {
  //   document
  //     .getElementById('selectToastPlacement')
  //     ?.addEventListener('change', function () {
  //       if (!toastPlacement.dataset.originalClass) {
  //         toastPlacement.dataset.originalClass = toastPlacement.className;
  //       }
  //       toastPlacement.className = `${toastPlacement.dataset.originalClass} ${this.value}`;
  //     });
  // }

  // document.querySelectorAll('.bd-example .toast').forEach((toastNode) => {
  //   const toast = new bootstrap.Toast(toastNode, { autohide: false });
  //   toast.show();
  // });

  // const toastTrigger = document.getElementById('liveToastBtn');
  // const toastLiveExample = document.getElementById('liveToast');
  // if (toastTrigger && toastLiveExample) {
  //   toastTrigger.addEventListener('click', () => {
  //     const toast = new bootstrap.Toast(toastLiveExample);
  //     toast.show();
  //   });
  // }

  // -------------------------------
  // Alerts
  // -------------------------------
  const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
  const alertTrigger = document.getElementById('liveAlertBtn');

  const appendAlert = (message: string, type: string) => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>',
    ].join('');

    alertPlaceholder?.append(wrapper);
  };

  if (alertTrigger) {
    alertTrigger.addEventListener('click', () => {
      appendAlert('Nice, you triggered this alert message!', 'success');
    });
  }

  // -------------------------------
  // Links
  // -------------------------------
  document.querySelectorAll('.bd-content [href="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
    });
  });
};
