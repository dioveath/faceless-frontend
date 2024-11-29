import React from "react"
import { TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Minus, Plus } from 'lucide-react'

export default function SettingsTab() {
    const [stability, setStability] = React.useState([0.5])
    const [similarity, setSimilarity] = React.useState([0.75])
    const [speed, setSpeed] = React.useState([1])

    return (
        <TabsContent value="settings" className="h-[calc(100%-40px)] overflow-auto">
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Model</label>
                    <Select defaultValue="turbo-v2">
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="turbo-v2">
                                <div className="flex items-center justify-between w-full">
                                    <span>Eleven Turbo v2</span>
                                    <Badge variant="secondary" className="ml-2">Recommended</Badge>
                                </div>
                            </SelectItem>
                            <SelectItem value="multilingual-v2">Eleven Multilingual v2</SelectItem>
                            <SelectItem value="english-v2">Eleven English v2</SelectItem>
                        </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                        Our English-only, low latency model. Best for developer use cases where speed matters and you only need English.
                    </p>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Voice</label>
                    <Select defaultValue="alex">
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="alex">Alex - Young Adult</SelectItem>
                            <SelectItem value="rachel">Rachel - Professional</SelectItem>
                            <SelectItem value="dave">Dave - Casual</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-4">
                    <SliderControl
                        label="Stability"
                        value={stability}
                        onChange={setStability}
                        max={1}
                        step={0.01}
                        tooltipContent="Adjust stability of the voice"
                        leftLabel="More variable"
                        rightLabel="More stable"
                    />

                    <SliderControl
                        label="Similarity"
                        value={similarity}
                        onChange={setSimilarity}
                        max={1}
                        step={0.01}
                        tooltipContent="Adjust similarity to original voice"
                        leftLabel="Low"
                        rightLabel="High"
                    />

                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <label className="text-sm font-medium">Speed</label>
                            <span className="text-xs text-muted-foreground">{speed[0].toFixed(2)}x</span>
                        </div>
                        <div className="flex items-center">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() => setSpeed([Math.max(0.5, speed[0] - 0.1)])}
                            >
                                <Minus className="h-4 w-4" />
                            </Button>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Slider
                                        value={speed}
                                        onValueChange={setSpeed}
                                        min={0.5}
                                        max={2}
                                        step={0.1}
                                        className="mx-3 [&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                                    />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="text-sm">Adjust speech speed</p>
                                </TooltipContent>
                            </Tooltip>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full"
                                onClick={() => setSpeed([Math.min(2, speed[0] + 0.1)])}
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>0.5x</span>
                            <span>2x</span>
                        </div>
                    </div>
                </div>
            </div>
        </TabsContent>
    )
}


type SliderControlProps = {
    label: string
    value: number[]
    onChange: (value: number[]) => void
    max: number
    step: number
    tooltipContent: string
    leftLabel: string
    rightLabel: string
}


function SliderControl({ label, value, onChange, max, step, tooltipContent, leftLabel, rightLabel }: SliderControlProps) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between">
                <label className="text-sm font-medium">{label}</label>
                <span className="text-xs text-muted-foreground">{value[0] * 100}%</span>
            </div>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Slider
                        value={value}
                        onValueChange={onChange}
                        max={max}
                        step={step}
                        className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                    />
                </TooltipTrigger>
                <TooltipContent>
                    <p className="text-sm">{tooltipContent}</p>
                </TooltipContent>
            </Tooltip>
            <div className="flex justify-between text-xs text-muted-foreground">
                <span>{leftLabel}</span>
                <span>{rightLabel}</span>
            </div>
        </div>
    )
}

