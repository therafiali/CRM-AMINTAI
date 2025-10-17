import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, MessageCircle, Clock, CheckCircle2, PlayCircle, RotateCcw, Smartphone } from 'lucide-react';

const CallTracker = ({ customerNumber, customerName, agentId }) => {
  const [callStatus, setCallStatus] = useState('idle');
  const [callStartTime, setCallStartTime] = useState(null);
  const [timer, setTimer] = useState(0);
  const [notes, setNotes] = useState('');
  const [callType, setCallType] = useState(''); // 'whatsapp' or 'phone'

  const formattedNumber = customerNumber.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${formattedNumber}`;
  const phoneUrl = `tel:${formattedNumber}`;

  // Timer effect
  useEffect(() => {
    let interval;
    if (callStatus === 'initiated') {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callStatus]);

  const startCall = (type) => {
    const startTime = new Date();
    setCallStartTime(startTime);
    setCallStatus('initiated');
    setCallType(type);
    setTimer(0);
    
    // Open the appropriate app
    if (type === 'whatsapp') {
      window.open(whatsappUrl, '_blank');
    } else {
      window.open(phoneUrl, '_blank');
    }
    
    logCallToDB({
      agentId,
      customerNumber,
      customerName,
      callStartTime: startTime,
      callType: type,
      status: 'initiated'
    });
  };

  const completeCall = () => {
    const durationInMinutes = Math.round(timer / 60);
    
    logCallToDB({
      agentId,
      customerNumber,
      customerName,
      callStartTime,
      callEndTime: new Date(),
      callDuration: durationInMinutes,
      callType,
      notes,
      status: 'completed'
    });
    
    setCallStatus('completed');
  };

  const resetCall = () => {
    setCallStatus('idle');
    setCallStartTime(null);
    setCallType('');
    setTimer(0);
    setNotes('');
  };

  const logCallToDB = (callData) => {
    console.log('Saving call log:', callData);
    // Your API call here
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusBadge = () => {
    switch (callStatus) {
      case 'idle':
        return <Badge variant="outline" className="bg-gray-50">Ready</Badge>;
      case 'initiated':
        return <Badge variant="default" className="bg-blue-500">In Progress</Badge>;
      case 'completed':
        return <Badge variant="default" className="bg-green-500">Completed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getCallTypeIcon = (type) => {
    return type === 'whatsapp' ? 
      <MessageCircle className="h-4 w-4" /> : 
      <Phone className="h-4 w-4" />;
  };

  const getCallTypeColor = (type) => {
    return type === 'whatsapp' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700';
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-6 w-6 text-blue-600" />
              Call Manager
            </CardTitle>
            <CardDescription>
              Professional call tracking - Phone & WhatsApp
            </CardDescription>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Customer Info */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Customer</p>
            <p className="font-semibold">{customerName}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
            <p className="font-mono font-semibold">{customerNumber}</p>
          </div>
        </div>

        {/* Idle State */}
        {callStatus === 'idle' && (
          <div className="space-y-6">
            <Tabs defaultValue="whatsapp" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="whatsapp" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </TabsTrigger>
                <TabsTrigger value="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Call
                </TabsTrigger>
              </TabsList>

              {/* WhatsApp Tab */}
              <TabsContent value="whatsapp" className="space-y-4">
                <div className="text-center py-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-4">
                    <MessageCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-lg mb-2">WhatsApp Call</h3>
                    <p className="text-muted-foreground">Initiate a voice or video call via WhatsApp</p>
                  </div>
                </div>

                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <PlayCircle className="h-4 w-4" />
                      WhatsApp Call Instructions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <ol className="space-y-3 text-sm">
                      <li className="flex items-start gap-3">
                        <Badge variant="secondary" className="w-6 h-6 p-0 flex items-center justify-center">1</Badge>
                        <span>Click "Start WhatsApp Call" to open chat</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Badge variant="secondary" className="w-6 h-6 p-0 flex items-center justify-center">2</Badge>
                        <span>Tap the <strong className="text-green-600">Phone icon</strong> at top right</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Badge variant="secondary" className="w-6 h-6 p-0 flex items-center justify-center">3</Badge>
                        <span>Select <strong>Voice Call</strong> or <strong>Video Call</strong></span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Badge variant="secondary" className="w-6 h-6 p-0 flex items-center justify-center">4</Badge>
                        <span>Return here after call completion</span>
                      </li>
                    </ol>
                  </CardContent>
                </Card>

                <Button 
                  onClick={() => startCall('whatsapp')}
                  size="lg"
                  className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Start WhatsApp Call
                </Button>
              </TabsContent>

              {/* Phone Call Tab */}
              <TabsContent value="phone" className="space-y-4">
                <div className="text-center py-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4">
                    <Phone className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-lg mb-2">Direct Phone Call</h3>
                    <p className="text-muted-foreground">Initiate a direct cellular call</p>
                  </div>
                </div>

                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <PlayCircle className="h-4 w-4" />
                      Phone Call Instructions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <ol className="space-y-3 text-sm">
                      <li className="flex items-start gap-3">
                        <Badge variant="secondary" className="w-6 h-6 p-0 flex items-center justify-center">1</Badge>
                        <span>Click "Start Phone Call" to open dialer</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Badge variant="secondary" className="w-6 h-6 p-0 flex items-center justify-center">2</Badge>
                        <span>Your phone's native dialer will open with the number</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Badge variant="secondary" className="w-6 h-6 p-0 flex items-center justify-center">3</Badge>
                        <span>Tap the <strong className="text-blue-600">Call button</strong></span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Badge variant="secondary" className="w-6 h-6 p-0 flex items-center justify-center">4</Badge>
                        <span>Return here after call completion</span>
                      </li>
                    </ol>
                  </CardContent>
                </Card>

                <Button 
                  onClick={() => startCall('phone')}
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Start Phone Call
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* In Progress State */}
        {callStatus === 'initiated' && (
          <div className="space-y-6">
            <div className="text-center py-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="animate-pulse">
                    {getCallTypeIcon(callType)}
                  </div>
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  {callType === 'whatsapp' ? 'WhatsApp Call' : 'Phone Call'} In Progress
                </h3>
                <div className="text-2xl font-bold text-blue-600 my-3">
                  {formatTime(timer)}
                </div>
                <p className="text-sm text-muted-foreground">
                  Started at {callStartTime?.toLocaleTimeString()}
                </p>
                <Badge variant="secondary" className="mt-2">
                  {callType === 'whatsapp' ? 'WhatsApp' : 'Phone'}
                </Badge>
              </div>
            </div>

            <Progress value={(timer % 60) * 1.67} className="h-2" />

            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline"
                onClick={() => window.open(callType === 'whatsapp' ? whatsappUrl : phoneUrl, '_blank')}
                className="h-11"
              >
                {getCallTypeIcon(callType)}
                Re-open {callType === 'whatsapp' ? 'WhatsApp' : 'Dialer'}
              </Button>
              
              <Button 
                onClick={completeCall}
                className={`h-11 ${getCallTypeColor(callType)}`}
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                End Call
              </Button>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">Call Notes</label>
              <Textarea
                placeholder="Document call details, customer concerns, follow-up actions..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Add important points discussed during the call
              </p>
            </div>
          </div>
        )}

        {/* Completed State */}
        {callStatus === 'completed' && (
          <div className="space-y-6">
            <div className="text-center py-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-4">
                <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-lg mb-2">
                  {callType === 'whatsapp' ? 'WhatsApp Call' : 'Phone Call'} Successfully Completed
                </h3>
                <p className="text-muted-foreground">Call details have been logged to the system</p>
                <Badge variant="secondary" className="mt-2">
                  {callType === 'whatsapp' ? 'WhatsApp' : 'Phone'}
                </Badge>
              </div>
            </div>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Call Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Call Type</span>
                  <span className="font-semibold flex items-center gap-2">
                    {getCallTypeIcon(callType)}
                    {callType === 'whatsapp' ? 'WhatsApp' : 'Phone'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-semibold">{formatTime(timer)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">Start Time</span>
                  <span className="font-semibold">{callStartTime?.toLocaleString()}</span>
                </div>
                {notes && (
                  <div className="py-2">
                    <span className="text-muted-foreground block mb-2">Notes</span>
                    <p className="text-sm bg-muted/50 p-3 rounded-md">{notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Button 
              onClick={resetCall}
              variant="outline"
              className="w-full h-11"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Start New Call
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CallTracker;