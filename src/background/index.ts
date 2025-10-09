chrome.action.onClicked.addListener(async () => {
  await chrome.sidePanel.setPanelBehavior({
    openPanelOnActionClick: true,
  })
})
