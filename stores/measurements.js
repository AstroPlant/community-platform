import { makeAutoObservable } from "mobx"
import { createContext } from "react"
import { WS_API_URL } from "../services/data-api";

class Measurements {

    socket = null;
    serial = "";
    measurements = []

    constructor() {
        makeAutoObservable(this)
    }

    setMeasurements = (measurements) => {
        this.measurements = measurements;
    }

    addMeasurement = (measurement) => {
        this.measurements = this.measurements.concat(measurement);
    }

    connect = () => {

        if (this.socket?.readyState < 2) {
            this.disconnect();
        }

        this.socket = new WebSocket(WS_API_URL);

        this.socket?.addEventListener("open", () => {

            if (!this.serial) return;

            this.socket.send(JSON.stringify({
                id: 1,
                jsonrpc: "2.0",
                method: "subscribe_rawMeasurements",
                params: { kitSerial: this.serial }
            }));

            this.socket.addEventListener("message", (event) => {
                const data = JSON.parse(event.data);
                if (data.method === "rawMeasurements" && data.params.result) {
                    this.addMeasurement(data.params.result);
                }
            })
        })
    }

    disconnect = () => {
        this.socket?.close();
    }

    setSerial = (newSerial) => {
        this.serial = newSerial;
        this.connect();
    }
}

export const measurementsStore = new Measurements();
export const measurementCtx = createContext(measurementsStore);