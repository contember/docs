import {
  CategoryScale, Chart as ChartJS, LinearScale, LineElement,
  PointElement, Title
} from "chart.js"
import chroma from "chroma-js"
import { interpolateBasis, quantize } from "d3-interpolate"
import * as React from "react"
import { Line } from "react-chartjs-2"

ChartJS.register(CategoryScale, LineElement, PointElement, LinearScale, Title);

const COLORS_COUNT = 41;
const COLORS_RANGE = Array.from({length: COLORS_COUNT}, (_, index) => index).reverse()

const COLORS_X_AXIS = COLORS_RANGE.map(
  (index) => (1000 - (1000 / (COLORS_COUNT - 1)) * index) / 1000
);

const count = 41;
const range = Array.from({length: count}, (_, index) => index).reverse()
const xAxis = range.map(
  (index) => (1000 - (1000 / (count - 1)) * index) / 1000
);

const coefficients_v1 = [ 8,   0,   0,  90,  68]
const coefficients_v2 = [-4, -15,   6, 180, 100]
const coefficients_v3 = [-4, -14,   6, 180, 100]
const coefficients_v4 = [ 1, -14, -20, 180,  30]
const coefficients = coefficients_v4

function luminanceListPolynomial() {
  const [c5, c4, c3, c2, c1] = coefficients

  return xAxis.map(
    (x) =>
      (c5 * x * x * x * x * x +
      c4 * x * x * x * x +
      c3 * x * x * x +
      c2 * x * x +
      c1 * x) /
      (c5 + c4 + c3 + c2 + c1)
  )
}

function luminanceListChromaScale() {
  return chroma
    .scale(["white", "black"])
    .correctLightness()
    .colors(COLORS_COUNT)
    .map((color) => chroma(color).luminance())
    .reverse()
}

const offsetInterpolatorSplineNodes_v1 = [0, 0.051, 0.135, 0.24, 0.34, 0.4908, 0.64, 0.82, 1]
const offsetInterpolatorSplineNodes_v2 = [0, 0.04, 0.21, 0.6, 1]
const offsetInterpolatorSplineNodes_v3 = [0, -0.09, -0.15, -0.01, 0]
const offsetInterpolatorSplineNodes_v4 = [0, -0.5, -0.01, -0.01, -0.0005, -0.00005, 0]
const offsetInterpolatorSplineNodes_v5 = [0, 0.01 * 2.4, 0.03 * 2.4, 0.002 * 2.4, 0]
const offsetInterpolatorSplineNodes_v6 = [0, 0.01 * 2.4, 0.03 * 2.4, 0.002 * 2.4, 0]
const offsetInterpolatorSplineNodes = offsetInterpolatorSplineNodes_v6
const offsetInterpolator = interpolateBasis(offsetInterpolatorSplineNodes);
const luminanceListOffsets = quantize(offsetInterpolator, COLORS_COUNT);

function luminanceListInterpolatedReverseAPCA() {
  const reverseAPCAInterpolator = interpolateBasis([0, 0.011103832067522131, 0.11610880806214403, 0.31235744401362725, 0.46854239366599476, 0.647705321877101, 1])

  return xAxis.map((x) => reverseAPCAInterpolator(x))
}

// Flat contrast lines
const luminancesList_polynomial = luminanceListPolynomial()

// Great shadows
const luminancesList_chromaScale = luminanceListChromaScale()

// Balanced shadows and highlights
const luminancesList_reversed = luminanceListInterpolatedReverseAPCA()

const luminancesList = luminancesList_reversed
// In case of need to offset values, uncomment:
// .map(
//   (Y, index) => Y + luminanceListOffsets[index]
// );

export const Chart = () => {
  return (
    <div className="App">
      <pre
        style={{
          color: "white",
          background: "black",
          padding: "0.5em",
          position: "sticky",
          top: 0
        }}
      >
        <br/>
        Luminance values:{" "}
        {JSON.stringify(
          luminancesList
            .map((number) => Math.round(number * 10000) / 10000)
            .filter((number, index) => index % 5 === 0)
        )}
        <br />
        Offseting values:{" "}
        {JSON.stringify(
          luminanceListOffsets
            .map((number) => Math.round(number * 10000) / 10000)
            .filter((number, index) => index % 5 === 0)
        )}
      </pre>
      <Line
        height="1000vh"
        options={{
          animation: {
            duration: 0
          }
        }}
        data={{
          labels: COLORS_X_AXIS,
          datasets: [
            {
              borderColor: "blue",
              data: luminancesList.map((Y) => Y * 100),
            },
            {
              borderColor: "red",
              data: luminancesList.map((Y) => (Math.log10(Y) + 2.5) * 40)
            },
            {
              borderColor: "pink",
              data: luminancesList_reversed.map((Y) => Y * 100),
            },
            {
              borderColor: "lightBlue",
              data: luminancesList_polynomial.map((Y) => Y * 100),
            },
            {
              borderColor: "lightGreen",
              data: luminancesList_chromaScale.map((Y) => Y * 100),
            },
            // {
            //   borderColor: "green",
            //   data: luminanceListOffsets.map((n) => n * 100)
            // }
          ]
        }}
      />
      <input
        type="text"
        style={{
          background: "black",
          color: "white",
          padding: "1em",
          position: "sticky",
          bottom: 0,
          width: "100%"
        }}
        value={JSON.stringify(
          luminancesList.reverse().map((number) => Math.round(number * 10000) / 10000)
        )}
      />
    </div>
  );
}
