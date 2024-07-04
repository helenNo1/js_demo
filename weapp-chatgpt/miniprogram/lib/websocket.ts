export async function useWebsocket(data: any) { const socketTask = wx.connectSocket({
		url: "wss://service-exbewxzu-1253830470.usw.apigw.tencentcs.com/release/",
	});
  return {
    send: () => {
      socketTask.onOpen(() => socketTask.send({ data: JSON.stringify(data) }));
    },

    handleMessage: (handler: Function) => {
      socketTask.onMessage((res) => handler(res.data as string));
    },

    handleClose: (handler: Function) => {
      socketTask.onClose((res) => handler(res));
    },
		handleError: (handler: Function) => {
      socketTask.onError((res) => handler(res));
    },
	};
}
