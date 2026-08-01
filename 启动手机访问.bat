@echo off
chcp 65001 >nul
title 天赐材料知识库 · 手机访问服务器
echo ========================================
echo  天赐材料知识库 — 手机访问服务器
echo ========================================
echo.
echo  手机操作（手机连接与电脑相同的 WiFi）：
echo  1. 打开手机浏览器（Chrome/微信均可）
echo  2. 输入地址: http://192.168.1.4:8000
echo     （若提示"无法访问"，请确认手机和电脑连的是同一个 WiFi）
echo  3. 首页打开后，点右上角「☰ 目录」切换专题
echo.
echo  按 Ctrl+C 可停止服务器
echo ========================================
echo.
node "%~dp0..\knowledge-base\_preview_server.js"
pause
