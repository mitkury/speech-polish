const processLinesFromStream = (rawData, onData) => {
    // Check if it's a JSON response
    if (rawData.startsWith("{")) {
        processDataAsJson(rawData, onData);
        return;
    }
    processDataAsStr(rawData, onData);
};
const processDataAsStr = (rawData, onData) => {
    const lines = rawData.split("\n");
    for (const line of lines) {
        if (line.startsWith("data: ")) {
            const dataStr = line.substring(6);
            // @TODO: at the moment it's OpenAI specific. Make it generic.
            if (dataStr === "[DONE]") {
                onData({ finished: true });
                return;
            }
            try {
                const data = JSON.parse(dataStr);
                onData(data);
            }
            catch (err) {
                throw new Error(err);
            }
        }
    }
};
const processDataAsJson = (rawData, onData) => {
    const lines = rawData.split("\n");
    for (const line of lines) {
        try {
            const data = JSON.parse(line);
            onData(data);
        }
        catch (err) {
            throw new Error(err);
        }
    }
};
export default processLinesFromStream;
//# sourceMappingURL=process-lines-from-stream.js.map