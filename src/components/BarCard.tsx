import { BarDatum, ResponsiveBar } from '@nivo/bar';
import { AxisProps } from '@nivo/axes';
import { AnalysisData } from '../types/AnalysisData';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { useState } from 'react';

const BarCard = ({ analysis }: { analysis: AnalysisData[] | null }) => {
    const [layout, setLayout] = useState<"horizontal" | "vertical" | undefined>("horizontal");

    // for mobile, change tick values and padding
    const { width } = useWindowDimensions();
    const isMobile = width < 768;
    const mobileTickValues = [0.2, 0.4, 0.6, 0.8, 1];
    const largeScreenTickValues = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
    const barPadding = layout === 'vertical' && isMobile ? 0.4 : 0.2;

    if (!analysis || analysis.length === 0) {
        return;
    }

    // bar data, mapped to match BarDatum
    const data: BarDatum[] = analysis.map(d => ({
        name: d.name,
        origin: d.origin,
        insight_name: d.insight_name,
        PetalWidthCm: d.value.PetalWidthCm,
        SepalWidthCm: d.value.SepalWidthCm,
        PetalLengthCm: d.value.PetalLengthCm,
        SepalLengthCm: d.value.SepalLengthCm,
    })).filter(d => d.insight_name != "feature_list");

    // Making both horizontal and vertical graphs
    const horizontalLayout = () => {
        setLayout('horizontal');
    };
    const verticalLayout = () => {
        setLayout('vertical');
    };
    const axisBottom: AxisProps = layout === 'horizontal' ? ({
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Length/width cm(%) \u2192',
        legendPosition: 'middle',
        legendOffset: 45,
        format: function (value: number) {
            return `${(value * 100)}%`
        },
        tickValues: isMobile ? mobileTickValues : largeScreenTickValues

    }) : (
        {
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendPosition: 'middle',
            legendOffset: -50,
        }
    )
    const axisLeft: AxisProps = layout === 'horizontal' ? (
        {
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendPosition: 'middle',
            legendOffset: -50,
        }
    ) : ({
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Length/width cm(%) \u2192',
        legendPosition: 'middle',
        legendOffset: -45,
        format: function (value: number) {
            return `${(value * 100)}%`
        },
        tickValues: isMobile ? mobileTickValues : largeScreenTickValues

    })
    return (
        // <div className='card-container max-w-screen overflow-auto'>
        <div className='max-w-screen max-h-screen overflow-auto'>

            <div className='btns flex justify-end gap-2 pb-4 pr-4'>
                <button onClick={horizontalLayout} className={layout === "horizontal" ? "text-white border border-blue rounded-[5px] py-[10px] px-5" : "border border-light-grey rounded-[5px] py-[10px] px-5"}>
                    Horizontal
                </button>
                <button onClick={verticalLayout} className={layout === "vertical" ? "text-white border border-blue rounded-[5px] py-[10px] px-5" : "border border-light-grey rounded-[5px] py-[10px] px-5"}>
                    Vertical
                </button>
            </div>
            {/* <div className='graph-container bg-[#c0c0c0] lg:p-1 w-full h-[800px] overflow-auto'> */}
            <div className={layout === 'horizontal' ? ` min-w-[600px] md:min-w-[800px] overflow-auto bg-[#c0c0c0] lg:p-1 w-full h-[800px]` : `min-w-[${width+50}px] overflow-auto bg-[#c0c0c0] lg:p-1 w-full h-[800px]`}>

                <ResponsiveBar
                    data={data}
                    keys={['PetalWidthCm', 'SepalWidthCm', 'PetalLengthCm', 'SepalLengthCm']}
                    indexBy="origin"
                    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                    padding={barPadding}
                    groupMode="grouped"
                    layout={layout}
                    valueScale={{ type: 'linear', min: 0, max: 1 }}
                    indexScale={{ type: 'band', round: true }}
                    valueFormat=".2%"

                    colors={{ scheme: 'purple_blue' }}
                    defs={[

                        {
                            id: 'lines',
                            type: 'patternLines',
                            background: 'inherit',
                            color: '#0b6bcb',
                            rotation: -45,
                            linewidth: 6,
                            spacing: 10
                        },
                        {
                            id: 'gradient',
                            type: 'linearGradient',
                            colors: [
                                { offset: 0, color: 'inherit' },
                                { offset: 100, color: 'inherit' },
                            ],

                            background: 'inherit',
                            rotation: -45,
                            linewidth: 6,
                            spacing: 10
                        }
                    ]}
                    fill={[
                        {
                            match: {
                                id: 'PetalWidthCm'
                            },
                            id: 'lines'
                        },
                        {
                            match: {
                                id: 'SepalWidthCm'
                            },
                            id: 'gradient'
                        },
                        {
                            match: {
                                id: 'PetalLengthCm'
                            },
                            id: 'gradient'
                        },
                        {
                            match: {
                                id: 'SepalLengthCm'
                            },
                            id: 'lines'
                        }
                    ]}

                    axisTop={null}
                    axisRight={null}
                    axisBottom={axisBottom}
                    axisLeft={axisLeft}
                    labelSkipWidth={12}
                    labelSkipHeight={10}
                    labelTextColor={{
                        from: '#000',
                        modifiers: [
                            [
                                'darker',
                                3
                            ]
                        ]
                    }}

                    legends={[
                        {
                            dataFrom: 'keys',
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 120,
                            translateY: 0,
                            itemsSpacing: 2,
                            itemWidth: 100,
                            itemHeight: 20,
                            itemDirection: 'left-to-right',
                            itemOpacity: 0.85,
                            symbolSize: 20,
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemOpacity: 1
                                    }
                                }
                            ],
                        }
                    ]}
                    role="application"
                    ariaLabel="Nivo horizontal bar chart"
                    barAriaLabel={(e) => `${e.id}: ${e.formattedValue} in model: ${e.indexValue}`}

                />
            </div>
        </div>
    )

}
export default BarCard;

