const menuInit = (isMac, appName) => {
    return [
        ...(isMac ? [{
            label: appName,
            submenu: [{
                    role: 'about'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'services'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'hide'
                },
                {
                    role: 'hideOthers'
                },
                {
                    role: 'unhide'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'quit'
                }
            ]
        }] : []),
        {
            label: 'Edit',
            submenu: [{
                    role: 'undo'
                },
                {
                    role: 'redo'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'cut'
                },
                {
                    role: 'copy'
                },
                {
                    role: 'paste'
                },
                ...(isMac ? [{
                        role: 'pasteAndMatchStyle'
                    },
                    {
                        role: 'delete'
                    },
                    {
                        role: 'selectAll'
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: 'Speech',
                        submenu: [{
                                role: 'startSpeaking'
                            },
                            {
                                role: 'stopSpeaking'
                            }
                        ]
                    }
                ] : [{
                        role: 'delete'
                    },
                    {
                        type: 'separator'
                    },
                    {
                        role: 'selectAll'
                    }
                ])
            ]
        },
        {
            label: 'View',
            submenu: [{
                    role: 'reload'
                },
                {
                    role: 'forceReload'
                },
                {
                    role: 'toggleDevTools'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'resetZoom'
                },
                {
                    role: 'zoomIn'
                },
                {
                    role: 'zoomOut'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'togglefullscreen'
                }
            ]
        },
    ]
}

exports.menuInit = menuInit