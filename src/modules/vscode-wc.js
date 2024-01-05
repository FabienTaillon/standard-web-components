import { provideVSCodeDesignSystem, vsCodeButton, vsCodeDataGrid, vsCodeDataGridRow, vsCodeDataGridCell } from "@vscode/webview-ui-toolkit";

provideVSCodeDesignSystem().register(vsCodeButton(), vsCodeDataGrid(), vsCodeDataGridRow(), vsCodeDataGridCell());